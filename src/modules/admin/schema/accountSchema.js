/* @flow */
import { AccountTC, AccountITC } from '../models/account';
export const AccountQuery = {
  accountById: AccountTC.getResolver('accountById'),
  filterAccounts:AccountTC.getResolver('filterAccounts'),
  accountOne: AccountTC.getResolver('findOne'),
  accountMany: AccountTC.getResolver('findMany'),
  accountCount: AccountTC.getResolver('count'),
  accountConnection: AccountTC.getResolver('connection'),
};

export const AccountMutation = {
  createAccount: AccountTC.getResolver('createAccount'),
  updateOperatingPeriods: AccountTC.getResolver('updateOperatingPeriods'),
  updateAccount: AccountTC.getResolver('updateAccount'),
  updateAccountById: AccountTC.getResolver('updateAccountById'),
  sendEmail:AccountTC.getResolver('sendEmail'),
  uploadFile:AccountTC.getResolver('uploadFile')

};
