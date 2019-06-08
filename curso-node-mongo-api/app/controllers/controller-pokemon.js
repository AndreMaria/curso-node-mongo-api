module.exports = (collection)=>{
    return {
        getPaginationPokemons : async (skip,limit) =>{
            return await collection.find({}).skip(skip).limit(limit).toArray();
        },
        getOnePokemon: async (query) => {
            return await collection.findOne(query);
        }, 
        getPokemos : async (query) => {
            return await collection.find(query).toArray();
        }
    }
}