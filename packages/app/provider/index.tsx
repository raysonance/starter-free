import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider, config } from '@my/ui'
import { AppState, AppStateStatus, Platform, useColorScheme } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

import { ToastViewport } from './ToastViewport'
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query'
import { useEffect } from 'react'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  const queryClient = new QueryClient()

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected)
    })
  })

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active')
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
        {...rest}
      >
        <ToastProvider
          swipeDirection="horizontal"
          duration={6000}
          native={
            [
              /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
              // 'mobile'
            ]
          }
        >
          {children}

          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}
