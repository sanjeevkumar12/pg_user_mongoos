import React from 'react';

export default class Footer extends React.Component{
    render(){
        return (
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © bootstrapdash.com 2020</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> &nbps; </span>
                </div>
            </footer>
        )
    }
}