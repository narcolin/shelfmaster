import mongoose from "mongoose";
const Schema = mongoose.Schema;

/* Command to add min validation to quantity (Mongoose validater is too weak)
db.runCommand( { collMod: "items", 
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "quantity"],
      properties: {
        quantity: {
          bsonType: "int",
          minimum: 0,
          description: "required and must be greater than or equal to 0."
        },
        name: {
          bsonType: "string",
          description: "required and must be a string"
        }
      }
    }
  }
})
*/

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    quantity: { type: Number, default: 0, min: 0 },
    dates_modified: {
      type: [Date],
      validate: {
        validator: function (v) {
          return v.length <= 30;
        },
        message: function (props) {
          return `${props.path} must have length less than or equal to 30, got '${props.value}'`;
        },
      },
    },
    delta_quantity: {
      type: [{ type: Number }],
      validate: {
        validator: function (v) {
          return v.length <= 30;
        },
        message: function (props) {
          return `${props.path} must have length less than or equal to 30, got '${props.value}'`;
        },
      },
    },
    food_type: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { collection: "items" },
);

export default mongoose.model("Item", ItemSchema);
