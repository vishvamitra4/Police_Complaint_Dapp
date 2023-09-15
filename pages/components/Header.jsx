import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../../styles/Home.module.css";

function Header() {
    return (
        <div>
            <div className="navbar">
                <div className="links">
                    <a href="#complain">Complain</a>
                    <a href="#status">Status</a>
                </div>
                <div style={{ right: "1%", top: "2px", position: "fixed" }} className={styles.connect}>
                    <ConnectWallet
                        dropdownPosition={{
                            side: "bottom",
                            align: "center",
                        }}
                    />
                </div>
            </div>
            <div className="description">
                <h1>Register Your Complaint with Web3.0.</h1>
                <p> It is an application where users can file their complaints without the interference of third parties. It provides a more authentic and democratic approach where anyone can view the progress and remarks made by the police on a particular case.</p>
            </div>
        </div>

    )
}

export default Header;