import { ROUTES } from "@constants"
import { AuthProvider, InvoiceProvider, MessageProvider, TeamProvider } from "@context"
import { AppLayout, AuthLayout, PageNotFound, SettingsLayout } from "@layouts"
import { DashboardPage, DocumentPage, InvoicePage, LoginPage, MessagesPage, ProfileSettingPage, SignupPage, TeamPage } from "@pages"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App: React.FC = () => {

  return <>
    <BrowserRouter>
      <AuthProvider>
        <MessageProvider>
          <InvoiceProvider >
            <TeamProvider>


              <Routes>
                <Route path={ROUTES.auth} element={<AuthLayout />}>
                  <Route index element={<LoginPage />} />
                  <Route path={ROUTES.login} element={<LoginPage />} />
                  <Route path={ROUTES.signup} element={<SignupPage />} />
                </Route>

                <Route element={<AppLayout />} path="/" >
                  <Route index element={<DashboardPage />} />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path={ROUTES.not_available} element={<PageNotFound />} />
                  <Route path={ROUTES.documents} element={<DocumentPage />} />
                  <Route path={ROUTES.messages} element={<MessagesPage />} />
                  <Route path={ROUTES.invoices} element={<InvoicePage />} />
                  <Route path={ROUTES.team} element={<TeamPage />} />
                </Route>

                <Route path={ROUTES.settings} element={<SettingsLayout />}>
                  <Route index element={<ProfileSettingPage />} />
                  <Route path={ROUTES.profile} element={<ProfileSettingPage />} />
                </Route>

              </Routes>
            </TeamProvider>
          </InvoiceProvider>
        </MessageProvider>
      </AuthProvider>
    </BrowserRouter >
  </>
}

export default App
