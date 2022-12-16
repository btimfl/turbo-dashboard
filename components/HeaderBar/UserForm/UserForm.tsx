interface User {
    name: string,
    email: string,
    phone: string,
    role: string,
    status: string
    action?: any
}

export default function UserForm(props: User) {
    return <p>User Form comes here.</p>
}