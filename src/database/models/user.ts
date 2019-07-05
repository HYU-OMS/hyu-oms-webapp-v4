import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  id: Schema.Types.ObjectId, // document 필드에는 나타나지 않음
  name: { type: String, required: true },
  social_type: { type: String, required: true },
  social_id: { type: Number, required: true },
  enabled: { type: Boolean, required: true, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

userSchema.index({
  social_type: 1,
  social_id: 1
}, {
  unique: true
});

export default mongoose.model('User', userSchema);