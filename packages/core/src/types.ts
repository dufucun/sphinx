import { ProposalRequest } from './actions/types'

export type StoreDeploymentConfig = (
  apiKey: string,
  orgId: string,
  configData: string
) => Promise<string>

export type RelayProposal = (proposalRequest: ProposalRequest) => Promise<void>

export type SphinxLock = {
  warning: 'THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.'
  format: string
  orgId: string
  projects: {
    [projectName: string]: {
      projectId: string
      projectName: string
      defaultSafe: {
        safeName: string
        owners: string[]
        threshold: string
        saltNonce: string
      }
    }
  }
}
