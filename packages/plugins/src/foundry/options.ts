import { exec } from 'child_process'
import { join, resolve } from 'path'
import { promisify } from 'util'

export const cleanPath = (dirtyPath: string) => {
  let cleanQuotes = dirtyPath.replace(/'/g, '')
  cleanQuotes = cleanQuotes.replace(/"/g, '')
  return cleanQuotes.trim()
}

export const resolvePaths = (outPath: string, buildInfoPath: string) => {
  const artifactFolder = resolve(outPath)
  const buildInfoFolder = resolve(buildInfoPath)
  const deploymentFolder = resolve('deployments')
  const compilerConfigFolder = resolve('.compiler-configs')

  return {
    artifactFolder,
    buildInfoFolder,
    deploymentFolder,
    compilerConfigFolder,
  }
}

export const getFoundryConfigOptions = async (): Promise<{
  artifactFolder: string
  buildInfoFolder: string
  deploymentFolder: string
  compilerConfigFolder: string
  cachePath: string
  storageLayout: boolean
  gasEstimates: boolean
  rpcEndpoints: { [chainAlias: string]: string }
}> => {
  const execAsync = promisify(exec)

  const forgeConfigOutput = await execAsync('forge config --json')
  const forgeConfig = JSON.parse(forgeConfigOutput.stdout)

  const buildInfoPath =
    forgeConfig.build_info_path ?? join(forgeConfig.out, 'build-info')

  const cachePath = forgeConfig.cache_path
  const rpcEndpoints = forgeConfig.rpc_endpoints

  // Since foundry force recompiles after changing the foundry.toml file, we can assume that the contract
  // artifacts will contain the necessary info as long as the config includes the expected options
  const storageLayout = forgeConfig.extra_output.includes('storageLayout')
  const gasEstimates = forgeConfig.extra_output.includes('evm.gasEstimates')

  return {
    ...resolvePaths(forgeConfig.out, buildInfoPath),
    storageLayout,
    gasEstimates,
    cachePath,
    rpcEndpoints,
  }
}
