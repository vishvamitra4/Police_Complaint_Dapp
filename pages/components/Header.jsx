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
        </div>

    )
}

export default Header;