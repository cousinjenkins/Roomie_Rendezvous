-- Users Table
CREATE TABLE Users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    confirm_password VARCHAR(255) NOT NULL,
    profile_picture TEXT,
    date_joined TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Profiles Table
CREATE TABLE Profiles (
    profile_id UUID PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender gender_enum NOT NULL,
    date_of_birth DATE,
    bio TEXT,
    smoker BOOLEAN,
    pet BOOLEAN,
    hobbies TEXT,
    language_spoken TEXT,
    looking_to_move_date DATE,
    university VARCHAR(255) NOT NULL
);

-- Matches Table
CREATE TABLE Matches (
    match_id UUID PRIMARY KEY,
    user1_id UUID REFERENCES Users(user_id),
    user2_id UUID REFERENCES Users(user_id),
    match_date TIMESTAMP NOT NULL,
    match_score FLOAT
);

-- Messages Table
CREATE TABLE Messages (
    message_id UUID PRIMARY KEY,
    sender_id UUID REFERENCES Users(user_id),
    receiver_id UUID REFERENCES Users(user_id),
    content TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- Disputes Table
CREATE TABLE Disputes (
    dispute_id UUID PRIMARY KEY,
    reporting_user_id UUID REFERENCES Users(user_id),
    reported_user_id UUID REFERENCES Users(user_id),
    reason TEXT NOT NULL,
    resolution TEXT,
    status dispute_status_enum NOT NULL,
    date_reported TIMESTAMP NOT NULL,
    date_resolved TIMESTAMP
);

-- PlatformUsage Table
CREATE TABLE PlatformUsage (
    usage_id UUID PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    action VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- VerificationRequests Table
CREATE TABLE VerificationRequests (
    request_id UUID PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    type verification_type_enum NOT NULL,
    status verification_status_enum NOT NULL,
    date_requested TIMESTAMP NOT NULL,
    date_processed TIMESTAMP,
    notes TEXT
);

-- SafetyTips Table
CREATE TABLE SafetyTips (
    tip_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

-- Resources Table
CREATE TABLE Resources (
    resource_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link TEXT NOT NULL,
    type resource_type_enum NOT NULL
);

-- Listings Table
CREATE TABLE Listings (
    listing_id UUID PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    rent_amount DECIMAL NOT NULL,
    number_of_roommates_wanted INTEGER,
    pictures TEXT[],
    date_posted TIMESTAMP NOT NULL,
    date_available TIMESTAMP NOT NULL,
    status listing_status_enum NOT NULL
);