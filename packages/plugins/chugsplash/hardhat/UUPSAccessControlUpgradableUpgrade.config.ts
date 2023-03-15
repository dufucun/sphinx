import { UserChugSplashConfig } from '@chugsplash/core'

import { fetchBuildInfo } from '../../test/constants'

const config: UserChugSplashConfig = {
  // Configuration options for the project:
  options: {
    projectName: 'UUPS AccessControl Upgradable Token',
  },
  contracts: {
    Token: {
      contract: 'UUPSAccessControlUpgradableV2',
      variables: {
        newInt: 1,
        originalInt: 1,
        _initialized: 1,
        _initializing: false,
        'ContextUpgradeable:__gap': [],
        'ERC165Upgradeable:__gap': [],
        'ERC1967UpgradeUpgradeable:__gap': [],
        'AccessControlUpgradeable:__gap': [],
        'UUPSUpgradeable:__gap': [],
        _roles: [],
      },
      externalProxy: '0x62DB6c1678Ca81ea0d946EA3dd75b4F71421A2aE',
      externalProxyType: 'oz-access-control-uups',
      // We must specify these explicitly because newer versions of OpenZeppelin's Hardhat plugin
      // don't create the Network file in the `.openzeppelin/` folder anymore:
      // https://docs.openzeppelin.com/upgrades-plugins/1.x/network-files#temporary-files
      previousBuildInfo: `artifacts/build-info/${fetchBuildInfo()}`,
      previousFullyQualifiedName:
        'contracts/UUPSAccessControlUpgradableV1.sol:UUPSAccessControlUpgradableV1',
    },
  },
}

export default config
