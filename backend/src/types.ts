export type User = {
    user_id?: string;  
    username: string;
    email: string;
    password: string;  
    confirm_passsword: string;
    profile_picture?: string;  
    date_joined?: Date;       
    last_login?: Date;        
    is_admin?: boolean;       
};

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
    university: string;
};

export interface Message {
    message_id: string;   // UUID
    sender_id: string;    // UUID
    receiver_id: string;  // UUID
    content: string;
    timestamp: Date;      // Or string depending on how you handle dates
}

export type Match = {
    match_id?: string; // Optional since it's auto-generated in DB
    user1_id: string;
    user2_id: string;
    match_date: Date;
    match_score: number;
}

export type Dispute = {
    dispute_id?: string;
    reporting_user_id: string;
    reported_user_id: string;
    reason: string;
    resolution?: string;
    status: 'processing' | 'resolved';
    date_reported?: Date;
    date_resolved?: Date;
};

// essentianlly documentation for what data types each entities represent so that you can write it out within TS. ie. API Dict