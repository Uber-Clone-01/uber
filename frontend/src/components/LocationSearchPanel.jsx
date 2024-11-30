import React from 'react';

const LocationSearchPanel = (props) => {
    const locations = [
        "123 Main Street, Springfield",
        "456 Elm Street, Shelbyville",
        "789 Oak Avenue, Capital City",
    ];

    return (
        <div>
            {locations.map((elem, index) => (
                <div
                    key={index}
                    onClick={() => {
                        props.setVehiclePanel(true);
                        props.setPanelOpen(false);
                    }}
                    className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
                >
                    <div className='bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full'>
                        <i className="ri-map-pin-fill text-black"></i>
                    </div>
                    <h4 className='font-medium'>{elem}</h4>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;



