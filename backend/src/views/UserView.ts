import User from '../models/User';

export default {
    render(user: User){
        return {
            UserId: user.UserId,
            Name: user.Name,
            User: user.User,
            Email: user.Email,
            FotoPath: `${process.env.BASE_URL}/uploads/${user.FotoPath}`,
            CreatedAt: user.CreatedAt
        };
    },
    renderLogin(user: User){
        return {
            UserId: user.UserId,
            Name: user.Name,
            User: user.User,
            Email: user.Email,
            FotoPath: `${process.env.BASE_URL}/uploads/${user.FotoPath}`
        };
    }
}