import React from 'react';
import { Toaster } from 'react-hot-toast';

function Tosat() {
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: ' #fff',
                        color: '#363636',
                    },

                    // Default options for specific types
                    success: {
                        duration: 4000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },

                    error: {
                        duration: 4000,
                        theme: {
                            primary: 'red',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </div>
    );
}

export default Tosat;
