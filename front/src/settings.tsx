import React, {useState} from "react";
import {Header, SideNav} from "./navigation";
import axios from "axios";




export function Settings(){

    const token = localStorage.getItem("user-info");
    console.log(token);



    const [page, setPage] = useState("My settings");
    return(
        <>
            <SideNav />
            <section className="content">
                <Header page={page}/>
                <article className="shadow0 widget1">
                    <h1>Settings</h1>
                    <button onClick={async () => {
                        let res = await axios.post("api/widget/widgets/weather1/user",{data: "bjr"}, {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        });
                        console.log(res);
                    }}>Add widget</button>
                </article>




            </section>
        </>
    )
}