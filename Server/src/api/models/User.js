import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const { Schema, model } = mongoose;

const roleDetailsSchema = new Schema({
    departmentManaged: String, // for admin
    permissions: [String],     // for admin and possibly for faculty with restricted permissions
    department: String,        // for faculty
    title: String,             // for faculty
    coursesTaught: [String],   // for faculty
    researchInterests: [String] // for faculty
}, { _id: false, strict: false }); // Make this schema flexible

const userSchema = new Schema({
  userType: {
    type: String,
    enum: ['alumni', 'admin', 'faculty', 'student'],
    default: 'alumni',
    required: true
  },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: String,
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please fill a valid email address']
    },
    phone: String,
    address: String
  },
  educationHistory: [{
    institutionName: String,
    degree: String,
    department: String,
    programme: String,
    yearOfGraduation: Number,
    activities: [String]
  }],
  workExperience: [{
    companyName: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    skills: [String]
  }],
  roleDetails: roleDetailsSchema,
  privacySettings: {
    showEmail: { type: Boolean, default: true },
    showPhone: { type: Boolean, default: false }
  },
  password: {
    type: String,
    required: true
  },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

userSchema.index({ 'personalDetails.firstName': 'text', 'personalDetails.lastName': 'text' });
userSchema.index({ 'contactInfo.email': 1 }, { unique: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);

export default User;
