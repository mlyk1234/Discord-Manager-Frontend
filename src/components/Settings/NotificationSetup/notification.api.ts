import { BASE_URL } from './../../../shared/index';
import axios from "axios";
import { useAppSelector } from "../../../shared/redux"

export const saveUserNotificationSettings =
    async (enableDiscordNotifications: boolean,
        enableTelegramNotifications: boolean,
        enableSlackNotifications: boolean,
        slackConnectionStatus: boolean,
        telegramConnectionStatus: boolean,
        discordWebhookURL: string,
        enableEmailNotifications: boolean,
        jwt: string
    ) => {
        console.log(            {
            enableDiscordNotifications,
            enableTelegramNotifications,
            enableSlackNotifications,
            slackConnectionStatus,
            telegramConnectionStatus,
            discordWebhookURL,
            enableEmailNotifications
        })
        await axios.post(`${BASE_URL}/api/v1/notification/save-notification-settings`,
            {
                enableDiscordNotifications,
                enableTelegramNotifications,
                enableSlackNotifications,
                slackConnectionStatus,
                telegramConnectionStatus,
                discordWebhookURL,
                enableEmailNotifications
            },
            {headers: {
                Authorization: `Bearer ${jwt}`
            }}
        )
}