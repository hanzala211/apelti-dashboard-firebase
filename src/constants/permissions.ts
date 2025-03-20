import { APP_ACTIONS } from '@constants';

export const PERMISSIONS: Record<string, string[]> = {
  admin: [
    APP_ACTIONS.dashboardPage,
    APP_ACTIONS.documentPage,
    APP_ACTIONS.invoicePage,
    APP_ACTIONS.messagesPage,
    APP_ACTIONS.addTeam,
    APP_ACTIONS.supplierPage,
    APP_ACTIONS.payemntPage,
    APP_ACTIONS.approvalPage,
    APP_ACTIONS.teamPage,
  ],
  clerk: [
    APP_ACTIONS.invoicePage,
    APP_ACTIONS.teamPage,
    APP_ACTIONS.invoicePage,
    APP_ACTIONS.supplierPage,
    APP_ACTIONS.messagesPage,
  ],
  approver: [
    APP_ACTIONS.messagesPage,
    APP_ACTIONS.teamPage,
    APP_ACTIONS.approvalPage,
  ],
};
