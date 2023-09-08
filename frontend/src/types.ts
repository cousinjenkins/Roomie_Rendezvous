export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female'
}
export type Profile = {
    profile_id?: string;
    user_id: string;
    first_name: string;
    last_name: string;
    gender: Gender;  // Using the Gender enum here.
    date_of_birth: Date;
    bio?: string;
    smoker: boolean;
    pet: boolean;
    hobbies?: string;
    language_spoken?: string;
    looking_to_move_date?: Date;
    university?: string;
}; 