const profile = {
  profile: {
    meta: {
      title: 'Syscoin SentryNodes - Profile',
      keywords: 'Syscoin, SentryNodes, Blockchain, Crypto, Blockmarket, Coins, Bitcoin, Cryptocurrency, Rewards',
      description: 'Sysnode.info provides Syscoin SentryNode Operators the tools to maximise the most from their SentryNodes!',
    },
    data: {
      heading: 'User Profile',
      address: {
        heading: 'My voting address',
        noAddress: "You don't have a voting address, please add one.",
        loading: 'Loading voting address...',
        addAddress: 'Add voting address'
      }
    },
    sidebar: {
      title: 'Settings',
      information: 'Information',
      password: 'Password',
      twoFactor: 'Two-Factor Auth',
      closeAccount: 'Close Account',
    },
    information: {
      title: 'Account Information',
      description: 'Update your email and voting address information',
      loading: 'Loading...',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      emailHelper: 'This email will be used for account notifications',
      votingAddressLabel: 'Voting Address',
      votingAddressPlaceholder: 'Enter your Syscoin voting address',
      votingAddressHelper: 'Your Syscoin address for governance voting',
      save: 'Save Changes',
      saving: 'Saving...',
      reset: 'Reset',
      copy: 'Copy',
      copied: 'Copied!',
      success: 'Your information has been updated successfully',
      errors: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        votingAddressInvalid: 'Please enter a valid Syscoin address',
        updateFailed: 'Failed to update information. Please try again.',
      },
    },
    passwordChange: {
      title: 'Change Password',
      description: 'Update your account password securely',
      currentPasswordLabel: 'Current Password',
      currentPasswordPlaceholder: 'Enter your current password',
      newPasswordLabel: 'New Password',
      newPasswordPlaceholder: 'Enter your new password',
      confirmPasswordLabel: 'Confirm New Password',
      confirmPasswordPlaceholder: 'Re-enter your new password',
      change: 'Change Password',
      changing: 'Changing...',
      success: 'Your password has been changed successfully',
      requirementsTitle: 'Password must include:',
      requirements: {
        length: 'At least 8 characters',
        uppercase: 'At least one uppercase letter',
        lowercase: 'At least one lowercase letter',
        number: 'At least one number',
        special: 'At least one special character',
      },
      strength: {
        weak: 'Weak password',
        fair: 'Fair password',
        strong: 'Strong password',
      },
      errors: {
        currentRequired: 'Current password is required',
        newRequired: 'New password is required',
        confirmRequired: 'Please confirm your new password',
        tooShort: 'Password must be at least 8 characters',
        requirementsNotMet: 'Password does not meet all requirements',
        passwordsDoNotMatch: 'Passwords do not match',
        sameAsOld: 'New password must be different from current password',
        wrongPassword: 'Current password is incorrect',
        updateFailed: 'Failed to change password. Please try again.',
      },
    },
  }
}
export default profile;