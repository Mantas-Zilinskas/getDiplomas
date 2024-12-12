using System.Server.Data;
using System.Server.IServices;
using System.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace System.Server.Services
{
    public class TaxService : ITaxService
    {
        private readonly SystemContext _context;
        public TaxService(SystemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tax>> GetAllTaxes()
        { 
            return await _context.Taxes.ToListAsync();
        }

        public async Task<Tax> GetTaxById(int id)
        {
            return await _context.Taxes.FindAsync(id);
        }

        public async Task CreateTax(Tax tax)
        { 
            _context.Taxes.Add(tax);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTax(Tax tax)
        { 
            _context.Taxes.Update(tax);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTax(int id)
        {
            var tax = await _context.Taxes.FindAsync(id);
            if (tax != null)
            {
                _context.Taxes.Remove(tax);
                await _context.SaveChangesAsync();
            }
        }

    }
}
