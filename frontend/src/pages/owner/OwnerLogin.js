import LoginForm from "../../components/LoginForm";

const OwnerLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm role={"owner"}/>
    </div>
  )
}

export default OwnerLogin;