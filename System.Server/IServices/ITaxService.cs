using System.Server.Models;

namespace System.Server.IServices
{
    public interface ITaxService
    {
        Task<IEnumerable<Tax>> GetAllTaxes();
        Task<Tax> GetTaxById(int id);
        Task CreateTax(Tax tax);
        Task UpdateTax(Tax tax);
        Task DeleteTax(int id);
    }
}
