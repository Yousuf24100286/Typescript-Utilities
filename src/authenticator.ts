import p from "passport";
import e from "express";


class Authenticator {
  private static _instance: Authenticator;
  private static instance: p.Authenticator;
  private constructor() {
    Authenticator.instance = new p.Authenticator();
  }

  public static getInstance() {
    if (!Authenticator._instance) {
      Authenticator._instance = new Authenticator();
    }
    return Authenticator._instance;
  }

  public serializeUser<
    USER_FROM_STRATEGY extends Express.User,
    SERIALIZED_USER extends Express.User
  >( 
    callback: (user: any) => SERIALIZED_USER | Promise<SERIALIZED_USER>  
  ) {
    Authenticator.instance.serializeUser<SERIALIZED_USER>(async (user, done)=> {
      try {
        const serializedUser = callback(user);
        if (serializedUser instanceof Promise) {
          done(null, await serializedUser);
          return;
        } else {
          done(null, serializedUser);
          return;
        }
      } catch (error: any) {
        done(error);
      }
    });
  }



  public static deserializeUser(id: string, done: (err: any, user?: Express.User) => void) {
    Authenticator.instance.deserializeUser(id, done);
  }
  public static useStrategy(name: string, strategy: p.Strategy) {
    Authenticator.instance.use(name, strategy);
  }
  public static initialize(): e.Handler {
    return Authenticator.instance.initialize();
  }
  public static session(): e.Handler {
    return Authenticator.instance.session();
  }


  public static authenticate<ErrorType extends Error>(strategy: string, options: p.AuthenticateOptions): e.Handler {
    return async function (req: e.Request, res: e.Response, next: e.NextFunction) {
      try {
        Authenticator.instance.authenticate(strategy, options)(req, res, (err: ErrorType) => {
          try {
            if (err) {
              throw err;
            }
            next();
          } catch (error: any) {
            next(error);
          }
        });
      } catch (error) {
        next(error);
      }
    }
  }


}

const authenticator = Authenticator.getInstance();

authenticator.serializeUser({ id: "1" }, (user) => {
  return user;
});
