import { useState } from "react";

interface UserEditorProps {
  userID: number;
  imageURL: string;
  firstName: string;
  lastName: string;
  gender: string;
  emailAddress: string;
  birthDate: string;
  state: string;
  onClose: () => void;
}

const UserEditor: React.FC<UserEditorProps> = ({
  userID,
  imageURL,
  firstName: initialFirstName,
  lastName: initialLastName,
  gender: initialGender,
  emailAddress: initialEmailAddress,
  birthDate: initialBirthDate,
  state: initialState,
  onClose,
}) => {

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>(initialFirstName);
  const [lastName, setLastName] = useState<string>(initialLastName);
  const [gender, setGender] = useState<string>(initialGender);
  const [emailAddress, setEmailAddress] = useState<string>(initialEmailAddress);
  const [birthDate, setBirthDate] = useState<string>(initialBirthDate);
  const [state, setState] = useState<string>(initialState);
  const [initialValues, setInitialValues] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    gender: initialGender,
    emailAddress: initialEmailAddress,
    birthDate: initialBirthDate,
    state: initialState,
  });

  const stateOptions = [
    { value: '', label: 'Select a state' },
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];

  const handleEditClick = () => { //open form for editing
    setEditing(true);
    setChangesSaved(false);
  };

  const handleCancelClick = () => { //reset input values to their previous values if edited
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setGender(initialValues.gender);
    setEmailAddress(initialValues.emailAddress);
    setBirthDate(initialValues.birthDate);
    setState(initialValues.state);
    setEditing(false);
    setChangesSaved(false);
    setError(null);
  };

  const [changesSaved, setChangesSaved] = useState<boolean>(false);

  const validateInputs = () => {
    //ensuring: names have only alphabetical chars and hyphens
    //          emails are of proper input
    //          dates are within the provided range

    const nameRegex = /^[A-Za-z-]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return "Names must contain only alphabetical characters or hyphen.";
    }

    if (!emailRegex.test(emailAddress)) {
      return "Invalid email address.";
    }

    // Check if birth date is within the valid range
    const birthDateObj = new Date(birthDate);
    const minDate = new Date('1900-01-01');
    const maxDate = new Date('2100-12-31');
    if (birthDateObj < minDate || birthDateObj > maxDate) {
      return "Birth date must be between 01-01-1900 and 12-31-2100.";
    }

    return null; // input is valid
  };
  
  const handleConfirmClick = () => {
    // validate inputs, return error message if invalid, save changes if valid
    const errorMessage = validateInputs();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    //input is valid, proceed with update request, close editor, reset error messages, display loading then edit success
    const url = `https://dummyjson.com/users/${userID}`; //pass selected users ID to url
    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        emailAddress: emailAddress,
        birthDate: birthDate,
        state: state
      })
    })
    .then(res => res.json())
    .then(console.log);
    
    setError(null);
    setEditing(false);
    setLoading(true);
  
    setTimeout(() => {
      setLoading(false);
      setChangesSaved(true);
    }, 700);
  };
  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-gray-100 rounded-lg p-4 border border-gray-400 max-w-xs relative w-[400px] h-[420px]">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          <svg
            className="h-6 w-6 fill-current text-gray-500"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 1 0 1.414-1.414L11.414 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="text-center mb-2">
          {editing ? (
            <div className="text-start mt-6">
            <div className="flex flex-wrap mb-2">
              <div className="w-1/2 pr-2 mb-2">
                <p className="font-bold">First Name</p>
                <input
                  type="text"
                  className="block w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <p className="font-bold">Last Name</p>
                <input
                  type="text"
                  className="block w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <p className="font-bold">Email</p>
            <input
              type="email"
              className="block w-full mb-4"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <div className="flex flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <p className="font-bold">Birth Date</p>
                <input
                  type="date"
                  className="block w-full"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <p className="font-bold">Gender</p>
                <select
                  className="block w-full mt-[4px]"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <p className="font-bold">State</p>
            <select
              className="block w-full mb-2"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              {stateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {error ? <p className="text-center text-red-500 text-sm mb-[-12px]">{error}</p> : <> </>}

          </div>
          
          ) : (
            <>
              <img
                src={imageURL}
                alt="Profile"
                className="w-32 h-32 object-cover mx-auto mt-4 mb-4"
              />
              <span className="block font-bold">
                {firstName} {lastName}
              </span>
              <span className="block">{emailAddress}</span>
              <span className="block">Gender: {gender}</span>
              <span className="block">Birth Date: {birthDate}</span>
              <span className="block">State: {state}</span>
            </>
          )}
        </div>

        {editing ? (
          <>
            <button
              className="border border-gray-300 bg-gray-300 text-gray-700 font-bold mt-8 py-2 px-4 rounded hover:bg-gray-400 mr-2"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="border border-green-500 bg-green-500 text-white font-bold mt-8 py-2 px-4 rounded hover:bg-green-700"
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
          </>
        ) : (
          <>
            <button
              className="border border-blue-500 bg-blue-500 text-white font-bold mt-4 py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleEditClick}
            >
              Edit
            </button>

            {changesSaved && (
              <p className="text-sm text-green-500 mt-4">changes saved &#x2713;</p>
            )}

            {loading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-900 mt-6"></div>
              </div>
            )}


          </>
        )}
      </div>
    </div>
  );
};

export default UserEditor;
