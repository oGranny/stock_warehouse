import React from 'react'
import { Meteor } from 'meteor/meteor'

const LoginPage = () => {
    let API_KEY = ""
    Meteor.call('getApiKey', (error, result) => {
        if (error) {
            console.error('Api_key not found:', error)
        } else {
            console.log('api_key:', result)
            API_KEY = result
        }
    })
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">you will be redirected on button click</h1>
                <a href='https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=c4861abc-2484-4271-910c-022f22ac61f3&redirect_uri=http://localhost:3000/' className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Login
                </a>
            </div>
        </div>
    )
}

export default LoginPage
