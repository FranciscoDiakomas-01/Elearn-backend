import db from "../database/db";
import IUser from "../models/UserModel";

interface IGetReult {
  limit: number;
  page: number;
  lastpage: number;
  total: number;
  data: IUser[];
}

class UserRepositoryEmp {
  private query: string = "";

  public async getUserById(id: number): Promise<IUser | string> {
    this.query =
      "SELECT id , firstname , lastname , profileurl , email ,  type , status , to_char(createdat , 'DD/MM/YYYY') as createdat , to_char(updatedat , 'DD/MM/YYYY') as updatedat FROM users WHERE id = $1 LIMIT 1;";
    const { rows, rowCount } = await db.query(this.query, [id]);
    try {
      if (rowCount == 1) {
        return rows[0] as IUser;
      } else {
        return "Usuário não encotrado";
      }
    } catch (error) {
      return error as string;
    }
  }

  public async getAllUsers(page: number): Promise<string | IGetReult> {
    const limit = 10;
    const offset = (page - 1) * limit;
    const { rowCount: total } = await db.query("SELECT id FROM users;");
    const lastpage = Math.ceil(Number(total == 0 ? 1 : total) / limit);
    this.query =
      "SELECT id , firstname , lastname , profileurl , email ,  type , status , to_char(createdat , 'DD/MM/YYYY') as createdat , to_char(updatedat , 'DD/MM/YYYY') as updatedat FROM users LIMIT $1 OFFSET $2;";
    try {
      const { rows: data } = await db.query(this.query, [limit, offset]);
      const result: IGetReult = {
        data,
        lastpage,
        limit,
        page,
        total: Number(total),
      };
      return result;
    } catch (error) {
      return error as string;
    }
  }

  public async getUsersByText(
    page: number,
    text: string
  ): Promise<string | IGetReult> {
    const limit = 10;
    const offset = (page - 1) * limit;
    const { rowCount: total } = await db.query(
      "SELECT id FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1;",
      [`%${text}%`]
    );
    const lastpage = Math.ceil(Number(total) / limit);
    this.query =
      "SELECT id , firstname , lastname , profileurl , email ,  type , status , to_char(createdat , 'DD/MM/YYYY') as createdat , to_char(updatedat , 'DD/MM/YYYY') as updatedat FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1 LIMIT $2 OFFSET $3;";
    try {
      const { rows: data } = await db.query(this.query, [
        `%${text}%`,
        limit,
        offset,
      ]);
      const result: IGetReult = {
        data,
        lastpage,
        limit,
        page,
        total: Number(total),
      };
      return result;
    } catch (error) {
      return error as string;
    }
  }

  public async deleteUserById(id: number): Promise<string> {
    this.query = "DELETE FROM users WHERE id = $1;";
    try {
      const { rowCount } = await db.query(this.query, [id]);
      if (rowCount == 1) {
        return "Usuário deletado com sucesso!";
      } else {
        return "Usuário não encotrado";
      }
    } catch (error) {
      return error as string;
    }
  }

  public async toggleUserStatus(id: number, status: boolean): Promise<string> {
    this.query = "SELECT id FROM users WHERE id = $1 LIMIT 1;";
    try {
      this.query = "UPDATE users SET status = $1 WHERE id = $2;";
      await db.query(this.query, [status, id]);
      return status == true ? "Usuário ativado" : "Usuário desativado";
    } catch (error) {
      return error as string;
    }
  }

  public async createUser(user: IUser) {
    this.query =
      "INSERT INTO users(firstname , lastname , password , profileurl ,email , type) VALUES ($1 , $2 , $3 , $4 , $5 ,$6) RETURNING id";
    try {
      const { rows } = await db.query(this.query, [
        user.firstName,
        user.lastName,
        user.password,
        user.profileurl,
        user.email,
        user.type,
      ]);
      const id = rows[0]?.id as number;
      return {
        id,
        type: user.type,
      };
    } catch (error) {
      return error as string;
    }
  }
  public async upateUser(user: Pick<IUser, "firstName" | "lastName" | "id">) {
    this.query =
      "UPATE users SET firstname = $1 , lastname = $2 WHERE id = $3;";
    try {
      await db.query(this.query, [user.firstName, user.lastName, user.id]);
      return "Dados alterado";
    } catch (error) {
      return error as string;
    }
  }

  public async updateUserProfile(profileURl : string , userid : number) {
    this.query = "UPDATE users SET profileurl = $1 WHERE id = $2 ";
    try {
      await db.query(this.query, [profileURl , userid]);
      return "Perfil alterado";
    } catch (error) {
      return error as string;
    }
  }

  public async UpdateUserCredentials(user: Pick<IUser, "password" | "email" | "id">) {
    this.query = "UPATE users SET email = $1 , password = $2  WHERE id = $3;";
    try {
      await db.query(this.query, [user.email, user.password, user.id]);
      return "Credenciais actualizadas";
    } catch (error) {
      return error as string;
    }
  }
}

const UserReposirory = new UserRepositoryEmp();

export default UserReposirory;
