// import { styled } from '@mui/material/styles';
// import makeStyles from '@mui/styles/makeStyles';
// import { Theme } from '@mui/material/styles';
// import { Box, Button, Switch, SwitchProps } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";

// interface ISlackProps {
//     authLink: string,
//     connected: boolean,
//     notificationsEnabled: boolean
// }
// export default function SlackNotification() {
//     const classes = useStyles();

//     const slackConnection = true;

//     const [slackDetails, setSlackDetails] = useState<ISlackProps>({ authLink: "", connected: false, notificationsEnabled: false });
//     const [slackSwitch, setSlackSwitch] = useState(false);
//     const [intialSlackSwitch, setInitialSlackSwitch] = useState(false);

//     const getJWT = async () => {
//         return { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAbWFpbC5jb20iLCJzdWIiOjEsInJvbGUiOiJVIiwiZXhwIjoxNjgwOTE0ODY4ODUxLCJpYXQiOjE2NzU1MTQ4Njh9.eCV0PNuNHgrIsL-twePwOSXRBXqcvftgt_Xpd94QnG0` } }
//     }
      
//     const getSocialMediaDetails = async () => {
//         const header = await getJWT();
//         const result = await axios.get("http://localhost:3002/api/v1/notification/get-social-media-details", header);
    
//         return result.data.data;
//     }

//     useEffect(() => {
//         async function initialiseSocialMediaSettings() {
//             const details = await getSocialMediaDetails();

//             const { telegramDetails, slackDetails, discordDetails, emailDetails } = details;
//             setSlackDetails(slackDetails);
//             setSlackSwitch(slackDetails.notificationsEnabled);
//             setInitialSlackSwitch(slackDetails.notificationsEnabled);
//         }
//         initialiseSocialMediaSettings();
//     }, []);

//     const slackDisconnect = async () => {
//         // dispatch(updateSlackConnectionStatus(false))
//     }

//     return (
//         <>
//             <div>
//                 Slack Connect
//                     <Box className='connections'>
//                         <ToggleSwitch checked={slackSwitch} onChange={() => setSlackSwitch(!slackSwitch)} />
//                         <Box>
//                             {!slackConnection ?
//                                 <a href={slackDetails.authLink} target="_blank" style={{ "textDecoration": "none" }}>
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         className={classes.connectButton}
//                                         size='small'
//                                         fullWidth
//                                         disableRipple>
//                                         Connect
//                                     </Button>
//                                 </a> : <Button
//                                     variant="contained"
//                                     color="primary"
//                                     className={classes.cancelButton}
//                                     size='small'
//                                     fullWidth
//                                     onClick={slackDisconnect}
//                                     disableRipple>
//                                     Disconnect
//                                 </Button>}
//                         </Box>
//                     </Box>
//             </div>
//         </>
//     )
// }

// const useStyles = makeStyles((theme: Theme) => ({
//     cancelButton: {
//         height: "40px",
//         fontSize: "14px",
//         fontWeight: 700,
//         border: "2px solid #D0D5DD",
//         color: "#344054",
//         textTransform: "capitalize",
//         backgroundColor: "inherit",
//         '&:hover': {
//             backgroundColor: "#D0D5DD",
//             border: "2px solid #D0D5DD",
//             boxShadow: 'none'
//         }
//     },

//     connectButton: {
//         width: "108px",
//         height: "40px",
//         fontSize: "14px",
//         fontWeight: 500,
//         textTransform: "capitalize",
//         backgroundColor: "#43D9BB",
//         '&:hover': {
//             boxShadow: 'none'
//         }
//     },

//     saveButton: {
//         width: "65px",
//         height: "40px",
//         fontSize: "14px",
//         fontWeight: 500,
//         textTransform: "capitalize",
//         backgroundColor: "#43D9BB",
//         '&:hover': {
//             boxShadow: 'none'
//         }
//     },
// }))

// const ToggleSwitch = styled((props: SwitchProps) => (
//     <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({ theme }: { theme: Theme }) => ({
//     width: 44,
//     height: 26,
//     padding: 0,
//     '& .MuiSwitch-switchBase': {
//         padding: 0,
//         margin: 2,
//         transitionDuration: '200ms',
//         '&.Mui-checked': {
//             transform: 'translateX(16px)',
//             color: '#fff',
//             '& + .MuiSwitch-track': {
//                 backgroundColor: '#43D9BB',
//                 opacity: 1,
//                 border: 0,
//             },
//             '&.Mui-disabled + .MuiSwitch-track': {
//                 opacity: 0.5,
//             },
//         },
//         '&.Mui-focusVisible .MuiSwitch-thumb': {
//             color: '#33cf4d',
//             border: '6px solid #fff',
//         },
//         '&.Mui-disabled .MuiSwitch-thumb': {
//             color:
//                 theme.palette.mode === 'light'
//                     ? theme.palette.grey[100]
//                     : theme.palette.grey[600],
//         },
//         '&.Mui-disabled + .MuiSwitch-track': {
//             opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
//         },
//     },
//     '& .MuiSwitch-thumb': {
//         boxSizing: 'border-box',
//         width: 22,
//         height: 22,
//     },
//     '& .MuiSwitch-track': {
//         borderRadius: 26 / 2,
//         backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
//         opacity: 1,
//         transition: theme.transitions.create(['background-color'], {
//             duration: 500,
//         }),
//     },
// }));

export default function SlackNotification() {
    return (
        <></>
    )
}