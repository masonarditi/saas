export default function StinkyFriendButton() {
    const handleSendEmail = () => {
      const subject = encodeURIComponent("i heard you dont shower");
      const body = encodeURIComponent("you lowkey stink bro... you need https://brogoshower.vercel.app");
      const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
      
      window.open(mailtoUrl, '_blank');
    };
  
    return (
      <div className="text-center mt-8">
        <button
          onClick={handleSendEmail}
          className="px-8 py-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-200 text-lg font-bold shadow-lg hover:shadow-xl"
        >
          📧 Send this to a stinky friend
        </button>
      </div>
    );
  }