import Sequelize from "sequelize";
import ICustomer from '../interfaces/ICustomer';
import Customer from '../db/Customer';
import Sale from '../db/Sale';
import { Op } from "sequelize";
import Due from '../db/Due';
const getSaleOptions = {
  include: [
    {
      model: Sale,
      as: 'sales'
    }
  ]
};

export async function getAllCustomers(limit: any) {
  let itemLimit;
  if ("limit" in limit) {
    itemLimit = limit.limit;
  } else {
    itemLimit = 10;
  }
  const allCustomers = await Customer.findAll({
    include: [
      {
        model: Due,
        as: "due",
        attributes: ["customerId", "amount"],  
      },
    ],
    // group: `due.customerId`,
    attributes: ["id", "firstName", "lastName","phoneNo","gender","bankAccount"],
    limit: itemLimit
    //[Sequelize.fn("SUM", Sequelize.col("amount")), "dueTotal"]
  });

  
  return allCustomers;
  
}

export async function getCustomer(id: number) {
  return await Customer.findByPk(id, getSaleOptions);
}

export async function createCustomer(customer: ICustomer) {
  return await Customer.create(customer);
}

export async function updateCustomer(id: number, customer: any) {
  const oldCustomer = await Customer.findByPk(id);
  if (oldCustomer) {
    const newCustomer = await oldCustomer.update(customer);
    return newCustomer;
  }
}

export async function deleteCustomer(id: number) {
  const oldCustomer = await Customer.findByPk(id);
  if (oldCustomer) {
    await oldCustomer.destroy();
    return oldCustomer;
  }
}

export async function searchCustomer(q: any) {
  const customerId = await Customer.findAll({
    attributes: ["id"],
    where: {
      [Op.or]: [
        { id: { [Op.like]: `%${q}%` } },
        { firstName: { [Op.like]: `%${q}%` } },
        { lastName: { [Op.like]: `%${q}%` } },
      ],
    },
  });
  const i_id = customerId.map((tag) => tag.id);
  const customer = await Customer.findAll({
    attributes: ["id", "firstName", "lastName", "email"],
    where: { id: i_id },
    
  });
  return customer;
}

// function returnCusArray (allCustomers: any){
//   let cus = {};
//   allCustomers.forEach(async (customers: any) => {
    
//       const {
//         id, firstName, lastName,phoneNo,gender,bankAccount
//       } = customers;
//       const dueTotal = await Due.findAll({attributes:[[Sequelize.fn("SUM", Sequelize.col("amount")), "dueTotal"]], where:{customerId:id}});
//       const cusDetails = {
//         id, firstName, lastName,phoneNo,gender,bankAccount, dueTotal 
//       };
//       const cus = {cusDetails};
    
//   });
//   return cus;
// };

