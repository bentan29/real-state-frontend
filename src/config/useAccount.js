export const useAccount = () => {

    const account = [
        {
          name: "Login",
          icon: 'GalleryVerticalEnd',
          plan: "Enterprise",
        },
        {
          name: "Registrar",
          icon: 'AudioWaveform',
          plan: "Startup",
        },
        {
          name: "Evil Corp.",
          icon: 'Command',
          plan: "Free",
        },
    ]


    return {
        account
    }
}

