import { userService } from "../services/userService";
import { authService } from "../services/authService";
import axios from 'axios';

class userController {
  static async sign(req, res, next) {
    try {
      const { accessToken } = req.body;
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
      );
      const user = await userService.findOrCreate({ data });
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await userService.findAll();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    const userIdList = []
    if (Object.keys(req.params).length === 0) {
      userIdList.push(req.currentUser.userId)//유저 탈퇴 현재 로그인중인 유저아이디써서
    } else {
      userIdList.push(...req.params.userId.split(","))//어드민 페이지에서 선택된 유저 한번에 강퇴
    }
    const deleteResult = { success: 0, failed: 0 }
    Promise.all(userIdList.map(async (userId) => {
      try {
        const result = await userService.deleteUser({ userId });
        if (result === 0) {
          deleteResult.failed += 1;
        } else {
          deleteResult.success += 1;;
        }
      } catch (error) {
        next(error);
      }
    })).then(() => {
      const body = {
        status: "success",
        payload: { ...deleteResult }
      }
      res.status(200).json(body)
    })
  }

  static async auth(req, res, next) {
    try {
      const { userId } = req.currentUser;
      const { answer } = req.body;
      const currentQuestion = await authService.getCurrentQuestion();
      if (currentQuestion?.answer == answer) {
        const result = await userService.authUser({ userId });
        return res.status(200).json({ result });
      }
      const result = { success: false }
      return res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  }
}
export { userController };