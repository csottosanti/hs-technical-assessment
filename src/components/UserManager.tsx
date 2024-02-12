import { useState } from "react";
import UserCard from "./UserCard";
import UserEditor from "./UserEditor";

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    maidenName?: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
      color: string;
      type: string;
    };
    domain: string;
    ip: string;
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    macAddress: string;
    university: string;
    bank: {
      cardExpire: string;
      cardNumber: string;
      cardType: string;
      currency: string;
      iban: string;
    };
    company: {
      address: {
        address: string;
        city: string;
        coordinates: {
          lat: number;
          lng: number;
        };
        postalCode: string;
        state: string;
      };
      department: string;
      name: string;
      title: string;
    };
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {
      coin: string;
      wallet: string;
      network: string;
    };
}

const UserManager: React.FC = () => {

    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [userData, setUserData] = useState<UserData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUserCardClick = (user: UserData) => {
        setShowEditor(true);
        setSelectedUser(user);
      };

    const handleClose = () => {
    setShowEditor(false);
    };

    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        fetch('https://dummyjson.com/users')
          .then((res) => res.json())
          .then((data) => {
            const users = data.users || [];
            const firstTwentyUsers = users.slice(0, 20);
            setUserData(firstTwentyUsers);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }, 1000);
    };

    return(
        <div className="mt-6 mb-10">
            <h2 className="text-3xl text-black mb-4">User Management Tool</h2>

            <button
            className="border border-blue-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
            onClick={fetchData}>
            Populate users
            </button>

            {/* Display loading spinner while waiting for data retreival */}
            {loading && (
              <div className="flex justify-center items-center mt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
              </div>
            )}

            {/* Populate a grid of UserCards with user data */}
            {userData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 p-4 sm:px-8 md:px-12 lg:px-16 justify-items-center"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                {userData.map((user) => (
                <div key={user.id} className="w-80" onClick={() => handleUserCardClick(user)}>
                    <UserCard
                    imageURL={user.image}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    emailAddress={user.email}
                    
                    />
                </div>
                ))}
            </div>
            )}

            {/* When a UserCard is clicked, open editor for selected user */}
            {showEditor && selectedUser && (
                <UserEditor
                userID={selectedUser.id}
                imageURL={selectedUser.image}
                firstName={selectedUser.firstName}
                lastName={selectedUser.lastName}
                gender={selectedUser.gender}
                emailAddress={selectedUser.email}
                birthDate={selectedUser.birthDate}
                state={selectedUser.address.state}
                onClose={handleClose}
                />
            )}

        </div>
    );
};

export default UserManager;