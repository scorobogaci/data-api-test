import {Icon} from "@aws-amplify/ui-react";

import {
    MdDashboard,
    MdAccountBox,
    MdCloudUpload,
    MdLogout
} from "react-icons/md";

export const baseConfig = {
    projectLink: "/", // GitHub link in the navbar
    docsRepositoryBase: "", // base URL for the docs repository
    titleSuffix: "",
    search: true,
    header: true,
    headerText: "Logo",
    footer: true,
    footerText: (
        <>
      <span>
       Made with ❤️ by {""}
          <a href="https://samantha-international.com/" target="_blank" rel="noreferrer">
          Samantha International
        </a>
      </span>
        </>
    ),

    logo: (
        <>
            <img
                src='/logo.png'
                alt="logo"
                width="30"
                height="22"
            />
        </>
    ),
};

/// Navigation sidebar
export const appNavs = [
    {
        eventKey: "dashboard",
        icon: <Icon as={MdDashboard}/>,
        title: "Dashboard",
        to: "/",
    },
    {
        eventKey: "files",
        icon: <Icon as={MdCloudUpload}/>,
        title: "Files",
        to: "/files",
    },

    // {
    //   eventKey: "tables",
    //   icon: <Icon as={MdOutlineTableChart} />,
    //   title: "Tables",
    //   to: "/tables",
    //   children: [
    //     {
    //       eventKey: "basic-table",
    //       title: "Basic Table",
    //       to: "/tables",
    //     },
    //     {
    //       eventKey: "users",
    //       title: "Users Table",
    //       to: "/users-table",
    //     },
    //   ],
    // },
    // {
    //   eventKey: "forms",
    //   icon: <Icon as={MdModeEditOutline} />,
    //   title: "Forms",
    //   to: "/forms",
    //   children: [
    //     {
    //       eventKey: "form-basic",
    //       title: "Basic",
    //       to: "/forms",
    //     },
    //     {
    //       eventKey: "form-wizard",
    //       title: "Edit Form",
    //       to: "/edit-form",
    //     },
    //   ],
    // },
    {
        eventKey: "profile",
        icon: <Icon as={MdAccountBox}/>,
        title: "Profile",
        to: "/profile",
    },
    {
        eventKey: "logout",
        icon: <Icon as={MdLogout}/>,
        title: "Logout",
    },
];
