const setup = {
  setup: {
    meta: {
      title: 'Syscoin Masternodes - Masternode Setup',
      keywords: 'Syscoin, Masternodes, Blockchain, Crypto, Blockmarket, Coins, Bitcoin, Cryptocurrency, Rewards',
      description: 'Sysnode.info provides Syscoin Masternode Operators the tools to maximise the most from their Masternodes!',
    },
    title: 'Learn About Syscoin Masternodes',
    preliminaries: {
      title: 'Important Preliminaries',
      description: 'Please read them carefully.',
      preliminary: {
        p1: 'You will need 100 000 SYS, plus change.',
        p2: {
          d1: 'You will need a server (can be virtual) with the following requirements:',
          d2: 'Check the list below for options. We purposefully don’t provide a single recommendation because we aim for a network that is regionally distributed and spread across various hosters.',
        },
        p3: 'You will need the latest version of Syscoin Qt 4.x 3. If you are still on Syscoin 3.x then you will need to follow the Upgrade Guide.',
        p4: 'We indicate placeholders by using squared brackets. [PASSWORD] becomes 12345 if your password is 12345. In fact, if your password is so simple, urgently learn about secure passwords and then change it.',
        p5: '',
      },
      providers: {
        title: 'List of VPS Providers',
        description: 'There are many VPS service providers that offer and exceed the hardware requirements, as such it is recommended that you shop around and do your own homework on various potential providers. Note the following is a list of just some examples and should not be interpreted as recommendations or endorsement',
      },
    },
    installation: {
      title: 'Installation',
      p1: {
        title: 'Getting Prepared',
        d1: 'To stake your masternode you will need to provide exactly 100,000 SYS in your masternode address. Use Syscoin-Qt for your system to process this transaction.',
        d2: 'Wait for your local Syscoin-Qt to fully sync.',
      },
      p2: {
        title: 'Unlocking Syscoin-Qt',
        d1: 'To unlock your wallet: go to Window-> Console',
        d2: 'and type:',
        d3: 'walletpassphrase [PASSWORD] [SECONDS]',
        d4: 'and press and',
        d5: 'Enter',
        d6: 'The ',
        d7: '[SECONDS]',
        d8: 'parameter defines for how many seconds your wallet should stay unlocked. You can also lock it again manually using',
        d9: 'walletlock',
      },
      p3: {
        title: 'Generating a Masternode Control Token',
        d1: 'To generate your masternode control token, go to Console',
        d2: 'and type:',
        d3: 'masternode genkey',
        d4: 'and press',
        d5: 'Enter',
        d6: 'Copy this value as you will need it later, it will look similar to the following:',
      },
      p4: {
        title: 'Generating A New Legacy Address',
        d1: 'Note:',
        d2: 'You need a Syscoin 4 address in a special legacy format, that can only be created using the console. Please follow these instructions without deviation.',
        d3: 'Go to Console and type:',
        d4: 'getnewaddress [LABEL] legacy',
        d5: 'and press',
        d6: 'Enter',
        d7: 'Pick something descriptive, such as',
        d8: 'as label.',
        d9: 'Masternodes require legacy addresses, and will neither work with the new Bech32 addresses that start with',
        d10: 'nor with ordinary addresses starting with',
        d11: 'Copy this address as well as you will need to send your collateral to it in the next step.',
        d12: 'Note:',
        d13: 'If you are creating multiple masternodes, you will need separate control tokens and collateral addresses for each.',
      },
      p5: {
        title: 'Sending 100,000 SYS Collateral',
        d1: 'Use the GUI, click on the',
        d2: 'Send',
        d3: 'tab.',
        d5: 'Inputs ...',
        d4: 'Click on',
        d6: 'Select the unspent transaction outputs you want to use for your collateral, click',
        d7: 'Be aware that you cannot send transactions with more than 675 inputs.',
        d8: 'Enter your masternode collateral address from the previous step into the',
        d9: 'Pay To',
        d10: 'field.',
        d11: 'Enter exactly',
        d12: '100,000',
        d13: 'into the',
        d14: 'Amount',
        d15: 'field and do',
        d16: 'not',
        d17: 'subtract fees from the amount.',
        d18: 'Press',
        d19: 'Send',
        d20: 'enter your password if asked, confirm the transaction details.',
        d21: 'Find your funding transaction in the transaction view by the label you provided earlier.',
        d22: 'Right-click on your new transaction and select',
        d23: 'Copy transaction ID',
      },
      p6: {
        title: 'Getting your Output Index',
        d1: 'Go back to the Console, type:',
        d2: 'masternode outputs',
        d3: 'and press',
        d4: 'Enter',
        d5: 'Match the transaction ID you just copied to the corresponding entry and note down the number behind it. This is the output index.',
      },
      p7: {
        title: 'Editing maternode.conf',
        d1: 'Next we will have to edit the masternode.conf file.',
        d2: 'Navigate to the ',
        d3: 'in',
        d4: 'The Syscoin data directory',
        d5: 'Open',
        d6: 'in a text editor of your choice, the simpler the better.',
        d7: 'Add a line at the bottom of the file, adhering to the format indicated in the comment at the top.',
        d8: 'Lines starting with',
        d9: 'are comments and will be ignored by Syscoin',
        d10: 'The alias you enter will identify this masternode in the',
        d11: 'tab in Syscoin-Qt.',
        d12: 'The required',
        d13: 'is that of your server.',
        d14: 'Use the',
        d15: 'as the port.',
        d16: 'Fill the rest of the fields with the information you copied earlier.',
        d17: 'Save the file',
        d18: 'Close and restart Syscoin-Qt.',
        d19: 'If you don’t see your masternode listed in the',
        d20: 'tab please double check the above configuration.',
        d21: 'If you now go to Coin Control you will see you collateral and it will have a padlock indicating it is locked.',
        d22: 'If you send any Syscoin from this wallet make sure that your collateral is locked.',
        d23: 'Convenience:',
        d24: 'After restarting, keep Syscoin-Qt running, we will need it again after setting up the server.',
      },
      p8: {
        title: 'Installing syscoind on your server',
        d1: 'Note:',
        d2: 'We’re using a script to keep this step as simple as possible. It’s a good idea to read through any script you find on the Internet before running it, including this one made by the community:',
        d3: 'Connect to your server via SSH.',
        d4: 'Win',
        d5: 'You can use',
        d6: 'as SSH client.',
        d7: 'If you’re not',
        d8: 'become',
        d9: 'by running',
        d10: 'If you are',
        d11: 'already, please consider creating another user accont and disabling root login as that is a security issue - especially if you log in using a password, instead of public key encryption.',
        d12: 'As root, enter the following command to start the automated install:',
        d13: 'Note this has only been tested on Ubuntu 16.04 and 18.04.',
        d14: 'will download the file and feed it to',
        d15: 'which is the name of the thing you’re typing your commands into.',
        d16: 'will then interpret the lines in the files as commands to execute and run the script.',
        d17: 'Providing input to the script.',
        d18: 'Default values are found in brackets and pressing enter will selected them.',
        d19: 'For entries with a [Y/n] the capital letter is the default. Enter',
        d20: 'to choose ‘yes’ or',
        d21: 'to choose',
        d22: 'Likely the only value you will need to enter is',
        d23: 'masternode control token.',
        d24: 'Wait for the setup to finish.',
        d25: 'Setup your access to syscoind.',
        d26: 'type:',
        d27: 'and press',
        d28: 'Enter',
        d29: 'Check you are fully synced and geth_sync_status = synced:',
        d30: 'type',
        d31: 'and press',
        d32: 'Enter',
        d33: 'You will get this error until you start your Masternode as below',
        d34: '“status”: “Not capable masternode: Masternode not in masternode list”',
        d35: 'START MASTERNODE',
      },
      p9: {
        title: 'Initializing your masternode',
        d1: 'Note:',
        d2: 'The next step requires a fully synced Syscoin-Qt, which should have happened by now if you didn’t close it as advised earlier. Otherwise, start it again and wait for it to fully sync. This can take 10 minutes.',
        d3: 'Choose the',
        d4: 'tab, select your masternode,',
        d5: 'Click',
        d6: 'Note:',
        d7: 'For the moment, the',
        d8: 'Button is bugged. We need to use the Console again.',
        d9: 'Unlock your walled as you did at the start in Step 2.',
        d10: 'Go to the Console, enter',
        d11: 'Every time you do this, you will reset the grace period your node has to wait before it can receive rewards. The grace period 102 hours at the time of this writing.',
        d12: '(Re-)Initializing a masternode does not affect seniority. Seniority is only dependent on the funding transaction.',
        d13: '13',
      },
      p10: {
        title: 'Governance / Sign up to Syshub (optional but highly recommended)',
        d1: 'As the proud owner of a masternode, you are elligible to partake in Syscoin’s governance process.',
        d2: 'The most convenient way to do this, is to head over to',
        d3: 'and register your masternode.',
        d4: 'Syshub allows you to easily, securely and comfortably:',
        d5: 'create proposals',
        d6: 'vote on proposals',
        d7: '…and checkout some statistics around masternodes.',
        d8: 'This is a community project, your votes and your input are important.',
      },
      p11: {
        title: 'Command reference to manage your masternode',
        d1: 'MASTERNODE COMMANDS IF YOU USED THE SCRIPT',
        d2: 'View your syscoin.conf',
        d3: 'View your sentinel.conf',
        d4: 'View the syscoin user crontab which should contain:',
        d5: 'Run a sentinel ping to speed up Qt syncing? why not!',
        d6: 'View the sentinel-ping cron log, look for errors',
        d7: 'View the syscoind debug log, look for errors',
        d8: 'Start and stop the syscoind systemd service',
        d9: 'Check that the syscoind process is running at the proper user',
        d10: 'Aliases to run the respective',
        d11: 'command as the',
        d12: 'user:',
      },
    },
    rewards: {
      title: 'Eligibility for Rewards',
      d1: 'Keep in mind that your masternode will not immediately be eligible for rewards. The eligibility period in hours is given by the formula',
      d2: 'number of masternodes',
    },
    updates: {
      title: 'Future Updates',
      d1: 'Updates and reconfigurations can be performed by entering the command',
      d2: 'or the initial auto install command:',
      d3: 'the earlier is an alias for the later',
    },
    summary: {
      title: 'Summary',
      d1: 'This script installs the necessary dependencies to build the Syscoin Core from source. It creates a user named',
      d2: 'and uses a systemd service to start the',
      d3: 'process as the',
      d4: 'user automatically at boot after the necessary networking services have started.',
    },
    acknowledgements: {
      title: 'Acknowledgements',
      description: 'Special thanks to demesm and doublesharp for the initial script, Bigpoppa for most of the conversion and bitje, johnp and the Syscoin team for upgrading and working out minor issues to get it running on SYS4.',
    },
  },
}
export default setup;