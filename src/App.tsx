import { ROUTES } from "@constants"
import { AuthProvider, InvoiceProvider, MessageProvider } from "@context"
import { AppLayout, AuthLayout } from "@layouts"
import { DashboardPage, DocumentPage, InvoicePage, LoginPage, MessagesPage, SignupPage, TeamPage } from "@pages"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App: React.FC = () => {

  return <>
    <BrowserRouter>
      <AuthProvider>
        <MessageProvider>
          <InvoiceProvider >

            <Routes>
              <Route path={ROUTES.auth} element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
                <Route path={ROUTES.login} element={<LoginPage />} />
                <Route path={ROUTES.signup} element={<SignupPage />} />
              </Route>

              <Route element={<AppLayout />} path="/" >
                <Route index element={<DashboardPage />} />
                <Route path={ROUTES.documents} element={<DocumentPage />} />
                <Route path={ROUTES.messages} element={<MessagesPage />} />
                <Route path={ROUTES.invoices} element={<InvoicePage />} />
                <Route path={ROUTES.team} element={<TeamPage />} />
              </Route>

            </Routes>
          </InvoiceProvider>
        </MessageProvider>
      </AuthProvider>
    </BrowserRouter>
  </>
}

export default App
