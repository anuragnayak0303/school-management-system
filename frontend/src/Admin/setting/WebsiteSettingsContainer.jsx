import React, { useEffect, useState } from "react";
import axios from "axios";
import WebsiteSettingsAdd from "./WebsiteSettingsAdd";
import WebsiteSettingsView from "./WebsiteSettingsView";
import WebsiteSettingsEdit from "./WebsiteSettingsEdit";
import WebsiteSettings from "./Website";
 

export default function WebsiteSettingsContainer() {
    const [mode, setMode] = useState("loading"); // loading, add, view, edit
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://school-management-system-1-jprf.onrender.com/api/website/get")
            .then(res => {
                if (res.data && Object.keys(res.data).length > 0) {
                    setData(res.data);
                    setMode("view");
                } else {
                    setMode("add");
                }
            })
            .catch(err => {
                console.error("Failed to fetch settings:", err);
                setMode("add");
            });
    }, []);

    const handleSave = (newData) => {
        setData(newData);
        setMode("view");
    };

    return (
        <>
            {mode === "loading" && <p className="text-center mt-20">Loading…</p>}
            {mode === "add" && <WebsiteSettingsAdd initialData={{}} onSave={handleSave} />}
            {mode === "view" && <WebsiteSettings data={data} onEdit={() => setMode("edit")} />}
            {mode === "edit" && <WebsiteSettingsEdit data={data} onCancel={() => setMode("view")} onSave={handleSave} />}
        </>
    );
}
