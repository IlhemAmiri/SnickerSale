module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let UserSchema = new Schema({
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        sexe: { 
            type: String, 
            required: true, 
            enum: ['homme', 'femme', 'autre'] 
        },
        dateDeNaissance: { type: Date, required: true },
        adresse: { type: String, required: true },
        numeroTelephone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        motDePasse: { type: String, required: true },
        image: { type: String } 
    }, {
        timestamps: true
    });
    UserSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })
    const User = mongoose.model('User', UserSchema);
    return User;
}
