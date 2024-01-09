export type DecodedApproveLeafData = {
  safeProxy: string
  moduleProxy: string
  merkleRootNonce: bigint
  numLeaves: bigint
  executor: string
  uri: string
  arbitraryChain: boolean
}

export type DecodedExecuteLeafData = {
  to: string
  value: bigint
  gas: bigint
  txData: string
  operation: bigint
  requireSuccess: boolean
}

/**
 * Represents the JSON objects outputted by the Solidity compiler that describe the structure of
 * state within the contract. See
 * https://docs.soliditylang.org/en/v0.8.3/internals/layout_in_storage.html for more information.
 */
export interface SolidityStorageObj {
  astId: number
  contract: string
  label: string
  offset: number
  slot: string
  type: string
}

export type GnosisSafeContractArtifact = {
  contractName: string
  sourceName: string
  abi: Array<any>
  bytecode: string
  deployedBytecode: string
  linkReferences: any
  deployedLinkReferences: any
}

export type LinkReferences = {
  [libraryFileName: string]: {
    [libraryName: string]: Array<{ length: number; start: number }>
  }
}

export type ContractArtifact = {
  abi: Array<any>
  sourceName: string
  contractName: string
  bytecode: string
  deployedBytecode: string
  linkReferences: LinkReferences
  deployedLinkReferences: LinkReferences
  metadata: CompilerOutputMetadata
  storageLayout?: SolidityStorageLayout
  methodIdentifiers?: {
    [methodSignature: string]: string
  }
}

export interface CompilerOutputMetadata {
  sources: {
    [sourceName: string]: any
  }
  output: {
    abi: Array<any>
    devdoc: {
      kind: 'dev'
      methods: {
        [key: string]: any
      }
      version: number
    }
    userdoc: {
      kind: 'user'
      methods: {
        [key: string]: any
      }
      version: number
    }
  }
}

/**
 * Container object returned by the Solidity compiler. See
 * https://docs.soliditylang.org/en/v0.8.3/internals/layout_in_storage.html for more information.
 */
export interface SolidityStorageLayout {
  storage: Array<SolidityStorageObj>
  types: {
    [typeName: string]: {
      encoding: 'inplace' | 'mapping' | 'dynamic_array' | 'bytes'
      label: string
      numberOfBytes: string
      key?: string
      value?: string
      base?: string
      members?: Array<SolidityStorageObj>
    }
  } | null
}
