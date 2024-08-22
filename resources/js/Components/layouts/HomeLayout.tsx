import { ReactNode } from "react";
import { UserTypes } from "../../Types/user";
import Header from "../Header";
import Footer from "../Footer";
import Content from "../Content";
import Container from "../Container";

interface HomeLayoutTyeps {
    children: ReactNode;
    user: UserTypes | null;
}

function HomeLayout({ children, user }: HomeLayoutTyeps) {
    return (
        <Container>
            <div className="max-w-[80rem] w-full flex flex-col items-center px-8">
                <Header user={user || null} />
                <Content>{children}</Content>
                <Footer />
            </div>
        </Container>
    );
}

export default HomeLayout;
