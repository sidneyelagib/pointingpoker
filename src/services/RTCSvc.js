class RTCSvc extends React.Component {
    constructor(props) {
        super(props);
        let lc = new RTCPeerConnection();
        let channel = lc.createDataChannel(props.channelName);
        
        channel.onmessage = this.readMessage;
        
        this.props.channel = channel;
    }

    sendMessage(msg) {
       if(msg != null) {
        this.props.channel.sendMessage(msg);
       }     
    }

    readMessage(event) {
        return event.data;
    }
}
export default RTCSvc;