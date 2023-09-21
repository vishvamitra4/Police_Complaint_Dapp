import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Header from "./components/Header";
import Head from "next/head";
import Complaint from "./components/Complaint";
import Status from "./components/Status";
import firstGif from "../public/1st.gif"
import statusImg from "../public/status.svg"
import Admin from "./components/Admin"
import ImageSlider from "./components/ImageSlider.jsx";
import { useContract, useContractWrite, useContractRead } from '@thirdweb-dev/react';

const Home = () => {

  const address = useAddress();
  const { contract } = useContract("0x2124B3a2dBf56B9b5c4C8B9062670C2c9f16d461");
  const { data: officer } = useContractRead(contract, "officer");
  return (
    <div className="box">
      <Head>
        <title>Police_Complaint_Dapp</title>
        <meta name="description" content="This is a Dapp for filling conplaint using WEB3.0" />
        <link rel="stylesheet" href="/styles/global.css" />
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>



      <ImageSlider />



      <Header />


      <div className="box-1">
        <Complaint />
        <div style={{ width: "50%" }}><Image id="image" src={firstGif} alt="my gif" unoptimized={true} priority /></div>
      </div>


      <div className="box-2">
        <div className="box-2-1">
          <Image src={statusImg} alt="statusImage" priority/>
        </div>
        <Status />
      </div>




      {(!address || address === officer) && <Admin />}

      <div style={{backgroundColor : "#007bff" , padding : "15px" , textAlign : "center" , fontWeight : "bold" , marginTop : "20px" , color : "white"}}>
        <p>@copyright 2023 By Vishvamitra</p>
      </div>



    </div>

  );
};

export default Home;



/*
<main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Welcome to{" "}
            <span className={styles.gradientText0}>
              <a
                href="https://thirdweb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                thirdweb.
              </a>
            </span>
          </h1>

          <p className={styles.description}>
            Get started by configuring your desired network in{" "}
            <code className={styles.code}>src/index.js</code>, then modify the{" "}
            <code className={styles.code}>src/App.js</code> file!
          </p>

          <div className={styles.connect}>
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://portal.thirdweb.com/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/portal-preview.png"
              alt="Placeholder preview of starter"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText1}>Portal ➜</h2>
              <p>
                Guides, references, and resources that will help you build with
                thirdweb.
              </p>
            </div>
          </a>

          <a
            href="https://thirdweb.com/dashboard"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/dashboard-preview.png"
              alt="Placeholder preview of starter"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText2}>Dashboard ➜</h2>
              <p>
                Deploy, configure, and manage your smart contracts from the
                dashboard.
              </p>
            </div>
          </a>

          <a
            href="https://thirdweb.com/templates"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/templates-preview.png"
              alt="Placeholder preview of templates"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText3}>Templates ➜</h2>
              <p>
                Discover and clone template projects showcasing thirdweb
                features.
              </p>
            </div>
          </a>
        </div>
      </div>
    </main>

    */
