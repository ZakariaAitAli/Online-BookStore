import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;

public class CORSFilter implements Filter {
    public void init(FilterConfig config) {}

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws ServletException, IOException {
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        chain.doFilter(req, res);
    }

    public void destroy() {}
}
