using Microsoft.EntityFrameworkCore;
using System.Server.Models;

namespace System.Server.Data
{
    public class SystemContext : DbContext
    {
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderProduct> OrderProducts { get; set; } = null!;
        public DbSet<OrderTax> OrderTaxes { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<ProductTax> ProductTaxes { get; set; } = null!;
        public DbSet<Tax> Taxes { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Payment> Payments { get; set; } = null!;
        public DbSet<Reservation> Reservations { get; set; } = null!;
        public DbSet<Service> Services { get; set; } = null!;

        public SystemContext(DbContextOptions<SystemContext> options)
            : base(options)
        {
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=SystemDatabase;Integrated Security=True;");
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .Property(o => o.Tip)
                .HasPrecision(10, 2);

            modelBuilder.Entity<OrderTax>()
                .Property(ot => ot.Value)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Tax>()
                .Property(t => t.Value)
                .HasPrecision(10, 2);

            modelBuilder.Entity<OrderProduct>()
                .Property(op => op.Price)
                .HasPrecision(10, 2);
            
            modelBuilder.Entity<Service>()
                .Property(s => s.Charge)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasPrecision(10, 2);
        }
    }
}
