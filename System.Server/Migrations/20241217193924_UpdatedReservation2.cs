using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace System.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedReservation2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Service",
                table: "Reservations");

            migrationBuilder.AddColumn<long>(
                name: "orderId",
                table: "Reservations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "orderId",
                table: "Reservations");

            migrationBuilder.AddColumn<int>(
                name: "Service",
                table: "Reservations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
