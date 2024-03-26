import React from "react";
import "../../styles/global.css";
import Navbar from "../../components/Navbar/Navbar";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="d-flex">
          <div
            className="d-flex"
            style={{
              width: "50vw",
              backgroundColor: "#a0a0a0",
              borderRadius: "4vw",
              margin: "2vw",
            }}
          >
            <Image
              src="/ghaylan.jpg"
              alt="fotoghaylan"
              width={300}
              height={300}
              style={{
                borderRadius: "50%",
                padding: "2vw",
              }}
            />
            <div className="align-self-center">
              <div>Nama : Ghaylan Muhammad Fatih</div>
              <div>Kesan & Pesan :       27 |     Cookies.get.mockReturnValue(undefined);
      28 |
     29 |     render(DashboardTenant /);
         |           ^
      30 |
      31 |     expect(useRouter().push).toHaveBeenCalledWith("/");
      32 |   ;</div>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              width: "50vw",
              backgroundColor: "#a0a0a0",
              borderRadius: "4vw",
              margin: "2vw",
            }}
          >
            <Image
              src="/daniel.jpg"
              alt="fotodaniel"
              width={300}
              height={300}
              style={{
                width: "20vw",
                borderRadius: "50%",
                padding: "2vw",
              }}
            />
            <div className="align-self-center">
              <div>Nama : Dwicakra Daniel</div>
              <div>Kesan & Pesan : Mata sakit moment</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="d-flex">
          <div
            className="d-flex"
            style={{
              width: "50vw",
              backgroundColor: "#a0a0a0",
              borderRadius: "4vw",
              margin: "2vw",
            }}
          >
            <Image
              src="/apis.jpg"
              alt="fotoapis"
              width={300}
              height={300}
              style={{
                width: "20vw",
                height: "20vw",
                borderRadius: "50%",
                padding: "2vw",
              }}
            />
            <div className="align-self-center">
              <div>Nama : Hafidz Shidqi</div>
              <div>Kesan & Pesan : kayaknya aku salah jurusan deh, 
                <br></br>buat gelan minimal commit message yang bener napa</div>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              width: "50vw",
              backgroundColor: "#a0a0a0",
              borderRadius: "4vw",
              margin: "2vw",
            }}
          >
            <Image
              src="/thoriq.jpg"
              alt="fotothoriq"
              width={300}
              height={300}
              style={{
                width: "20vw",
                borderRadius: "50%",
                padding: "2vw",
              }}
            />
            <div className="align-self-center">
              <div>Nama : Muhammad Thoriq Ramadhan</div>
              <div>Kesan & Pesan : Lelah, letih, lesu, & loyo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
