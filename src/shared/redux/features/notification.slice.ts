import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface _DEFAULT {
    name: string,
    notificationsEnabled: boolean,
}

interface _IDISCORD {
    webhookURL: string
}

interface _ISLACK {
    connected: boolean,
    authLink: string
}

interface _TELEGRAM {
    connected: boolean,
    botlink: string
}

export interface INotificationSetup {
    'discordDetails': _DEFAULT & _IDISCORD,
    'emailDetails': _DEFAULT,
    'slackDetails': _DEFAULT & _ISLACK,
    'telegramDetails': _DEFAULT & _TELEGRAM,
}

const initialState: INotificationSetup = {
    'discordDetails': {
        name: 'Discord',
        notificationsEnabled: false,
        webhookURL: ''
    },
    'emailDetails': {
        name: 'Email',
        notificationsEnabled: false,
    },
    'slackDetails': {
        name: 'Slack',
        notificationsEnabled: false,
        connected: false,
        authLink: ''
    },
    'telegramDetails': {
        name: 'Telegram',
        notificationsEnabled: false,
        connected: false,
        botlink: '',
    }
};

export const notificationSlice = createSlice({
  initialState,
  name: 'notificationSlice',
  reducers: {
    reset: () => initialState,
    initUserNotificationSetup: (state, action: PayloadAction<INotificationSetup>) => {
        console.log('[initUserNotificationSetup]:', action.payload)

        state.discordDetails = action.payload.discordDetails;
        state.emailDetails = action.payload.emailDetails;
        state.slackDetails = action.payload.slackDetails;
        state.telegramDetails = action.payload.telegramDetails;
    },
  },
  extraReducers: (builder) => {},
});

export default notificationSlice.reducer;

export const { reset, initUserNotificationSetup } = notificationSlice.actions;
