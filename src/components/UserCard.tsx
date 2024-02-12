interface UserCardProps {
    imageURL: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
  }
  
  const UserCard: React.FC<UserCardProps> = ({ imageURL, firstName, lastName, emailAddress }) => {
    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 inline-flex items-center w-80 cursor-pointer transition duration-300 hover:border-blue-500 hover:shadow-md">
            <img src={imageURL} alt={`${firstName} ${lastName}`} className="w-20 h-20 mr-4" />
            <div>
                <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
                <p className="text-gray-600">{emailAddress}</p>
            </div>
        </div>
    );
  };
  
  export default UserCard;