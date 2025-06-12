import LoginForm from "../../components/LoginForm";

const EmployeeLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm role={"employee"} />
    </div>
  )
}

export default EmployeeLogin;