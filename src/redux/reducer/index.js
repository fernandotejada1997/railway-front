let initialState = {
    allDogs: [],
    copyallDogs: [],
    filtered: [],
    temperaments: [],
    detail: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
    case "GET_DOGS":

        //trae todo a alldogs y a copyalldogs

        return {
        ...state,
        allDogs: action.payload,
        copyallDogs: action.payload,
        filtered: action.payload
        };


    case "GET_TEMPERAMENTS":
        return {
        ...state,
        temperaments: action.payload
        };

    case "FILTER_BY_STATUS":

        //toma la copyallDogs y filtra en alldogs y en filtered

        const copyallDogs = state.copyallDogs;

        const statusfilter = () => {
        if (action.payload === "all") {
            return copyallDogs;
        }
        if (action.payload === "api") {
            let filteredDogs = copyallDogs.filter(dog => typeof dog.id === 'number');
            return filteredDogs;
        }
        if (action.payload === "db") {
            let filteredDogs = copyallDogs.filter(dog => typeof dog.id === 'string' && dog.id.includes("-"));
            return filteredDogs;
        }
        return copyallDogs;
        };

        return {
        ...state,
        allDogs: statusfilter(),
        filtered: statusfilter()
        };


        case "ORDER_BY":
            const orderBy = action.payload;
            let sortedDogs = [...state.allDogs];

            if (orderBy === "asc") {
                sortedDogs.sort((a, b) => a.name.localeCompare(b.name));
            } else if (orderBy === "des") {
                sortedDogs.sort((a, b) => b.name.localeCompare(a.name));
            } else if (orderBy === "peso") {
                sortedDogs.sort((a, b) => {
                const weightA = a.weight.metric || a.weight;
                const weightB = b.weight.metric || b.weight;

                const parsedWeightA = parseInt(weightA);
                const parsedWeightB = parseInt(weightB);

                if (isNaN(parsedWeightA) && isNaN(parsedWeightB)) {
                    return 0;
                } else if (isNaN(parsedWeightA)) {
                    return 1;
                } else if (isNaN(parsedWeightB)) {
                    return -1;
                } else {
                    return parsedWeightA - parsedWeightB;
                }
            });
        }else if (orderBy === "pesodesc") {
            sortedDogs.sort((a, b) => {
            const weightA = b.weight.metric || b.weight;
            const weightB = a.weight.metric || a.weight;

            const parsedWeightA = parseInt(weightA);
            const parsedWeightB = parseInt(weightB);

            if (isNaN(parsedWeightA) && isNaN(parsedWeightB)) {
                return 0;
            } else if (isNaN(parsedWeightA)) {
                return 1;
            } else if (isNaN(parsedWeightB)) {
                return -1;
            } else {
                return parsedWeightA - parsedWeightB;
            }
        });
    }

        return {
        ...state,
        allDogs: sortedDogs
        };
        case "FILTER_TEMPERAMENT":

            const Temperament = action.payload
            const dogsfiltered = state.filtered.filter(dog=>
                dog.temperament?.includes(Temperament)
            )

            return{
                ...state,
                allDogs: dogsfiltered
            }
        case "SEARCH_DOG":

            const search = action.payload
            const filteredCharacters = state.copyallDogs.filter((dog) =>
                dog.name.toLowerCase().includes(search.toLowerCase())
                )

            return{
                ...state,
                allDogs: filteredCharacters
            }
        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }

        case "POST_DOG":
            return{
                ...state
            }
        case "CLEAR_DETAIL":
            return {
                ...state,
                detail: []
            };

    default:
        return { ...state };
    }
}

export default rootReducer;