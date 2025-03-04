import { ROUTES } from "@constants"
import { AuthProvider, InvoiceProvider, MessageProvider, TeamProvider } from "@context"
import { AppLayout, AuthLayout, PageNotFound, ProtectedRouteLayout } from "@layouts"
import { DashboardPage, DocumentPage, InvoicePage, LoginPage, MessagesPage, SignupPage, TeamPage } from "@pages"
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
                  <Route path="*" element={<PageNotFound />} />
                  <Route path={ROUTES.not_available} element={<PageNotFound />} />
                  <Route index element={<ProtectedRouteLayout allowedRoles={["admin"]}><DashboardPage /></ProtectedRouteLayout>} />
                  <Route path={ROUTES.documents} element={<ProtectedRouteLayout allowedRoles={["admin", "accountant"]}><DocumentPage /></ProtectedRouteLayout>} />
                  <Route path={ROUTES.messages} element={<ProtectedRouteLayout allowedRoles={["admin", "clerk", "approver", "accountant", "payer"]}><MessagesPage /></ProtectedRouteLayout>} />
                  <Route path={ROUTES.invoices} element={<ProtectedRouteLayout allowedRoles={["admin", "clerk", "approver"]}><InvoicePage /></ProtectedRouteLayout>} />
                  <Route path={ROUTES.team} element={<TeamPage />} />
                </Route>

              </Routes>
            </TeamProvider>
          </InvoiceProvider>
        </MessageProvider>
      </AuthProvider>
    </BrowserRouter>
  </>
}

export default App
